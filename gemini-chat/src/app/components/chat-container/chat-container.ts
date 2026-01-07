import { Component, signal, computed, inject } from '@angular/core';
import { Message } from '../../models/message.model';
import { MessageList } from '../message-list/message-list';
import { MessageInput } from '../message-input/message-input';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [MessageList, MessageInput],
  templateUrl: './chat-container.html',
  styleUrl: './chat-container.css'
})
export class ChatContainer {
  private geminiService = inject(GeminiService);

  messages = signal<Message[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  messageCount = computed(() => this.messages().length);

  onSendMessage(text: string) {
    this.errorMessage.set(null);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: text,
      role: 'user',
      timestamp: new Date()
    };

    this.messages.update(prev => [...prev, userMessage]);
    this.isLoading.set(true);

    this.geminiService.sendMessage(text).subscribe({
      next: (response) => {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          text: response,
          role: 'assistant',
          timestamp: new Date()
        };
        this.messages.update(prev => [...prev, assistantMessage]);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set("Une erreur est survenue lors de l'envoi du message.");
        this.isLoading.set(false);
      }
    });
  }
}
