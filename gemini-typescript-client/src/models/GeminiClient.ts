// TODO: Importez les types et utilitaires nécessaires
import { RequestOptions, SuccessResponse, ErrorResponse, ApiResponse, Statistics } from '../types/gemini.types';
import { validateApiKey, formatPrompt, createDefaultConfig, calculateElapsedTime, logMessages } from '../utils/validator';
// TODO: Créez une classe GeminiClient
// Propriétés privées :
// - apiKey: string
// - modelName: string
// - baseUrl: string (readonly)
// - stats: Statistics


// Propriété publique :
// - debug: boolean

    
// Constructeur :
// - Paramètres : apiKey: string, modelName?: string, debug?: boolean
// - Initialise toutes les propriétés
// - baseUrl = "https://generativelanguage.googleapis.com/v1beta"
// - Initialise stats à 0
// L'url finale doit être https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=APIKEY
 

// Méthodes à implémenter :




// Votre code ici

class GeminiClient {
    private apiKey: string;
    private modelName: string;
    private readonly baseUrl: string;
    private stats: Statistics;
    public debug: boolean;

    public constructor (apiKey: string, modelName?: string, debug?: boolean) {
        this.apiKey = apiKey;
        this.modelName = modelName || "gemini-2.5-flash-lite";
        this.baseUrl = "https://generativelanguage.googleapis.com/v1beta";
        this.stats = {
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            averageResponseTime: 0
        };
        this.debug = debug || false;    
    }

    // 1. Méthode privée buildUrl
    // Paramètres : endpoint: string
    // Retour : string
    // Construit l'URL complète avec la clé API
    private buildUrl(endpoint: string): string {
        return `${this.baseUrl}/${endpoint}?key=${this.apiKey}`;
    }

    
    // 2. Méthode publique async ask
    // Paramètres : options: RequestOptions
    // Retour : Promise<ApiResponse>
    // Envoie une requête à l'API Gemini
    // Gère les erreurs et met à jour les statistiques
    // La requête doit être un POST sur l'URL avec comme body :
    /* {
        contents: [
            {
                parts: [{ text: "" }],
            },
            ],
        generationConfig: options.config || {
            temperature: 0.7,
            maxOutputTokens: 2048,
            },
        };
    */

    public async ask(options: RequestOptions): Promise<ApiResponse> {
        const startTime = Date.now();
        this.stats.totalRequests += 1;
        const url = this.buildUrl(`models/${this.modelName}:generateContent`);
        const body = {
            contents: [
                {
                    parts: [{ text: options.prompt }],
                },
            ],
            generationConfig: options.config || {
                temperature: 0.7,
                maxOutputTokens: 2048,
            },
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            // Cast en 'any' pour éviter l'erreur "type unknown" lors de l'accès aux propriétés de l'API
            const data = (await response.json()) as any;
            const timelapsed = calculateElapsedTime(startTime);

            if (!response.ok) {
                this.stats.failedRequests += 1;
                if (this.debug) console.log("Request failed in " + timelapsed + " ms");
                
                return {
                    success: false,
                    error: data.error?.message || "Unknown API error",
                    code: response.status
                };
            } else {
                this.stats.successfulRequests += 1;
                
                // Mise à jour de la moyenne du temps de réponse
                const currentAvg = this.stats.averageResponseTime;
                const count = this.stats.successfulRequests;
                this.stats.averageResponseTime = (currentAvg * (count - 1) + timelapsed) / count;

                if (this.debug) console.log("Request succeeded in " + timelapsed + " ms");
                
                return {
                    success: true,
                    // Extraction du texte depuis la structure de réponse Gemini
                    data: data.candidates?.[0]?.content?.parts?.[0]?.text || "",
                    metadata: {
                        model: this.modelName,
                        tokensUsed: data.usageMetadata?.totalTokenCount || 0
                    }
                };
            }       
        } catch (error) {
            this.stats.failedRequests += 1;
            if (this.debug) console.log("Request error: ", error);
            return { 
                success: false, 
                error: (error as Error).message, 
                code: 500 
            };
        }

    }

// 3. Méthode publique getStats
// Retour : Statistics
// Retourne une copie des statistiques
    public getStats(): Statistics {
        return { ...this.stats };
    }

// 4. Méthode publique resetStats
// Retour : void
// Remet les statistiques à zéro
    public resetStats(): void {
        this.stats = {
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            averageResponseTime: 0
        };
    }

// 5. Getter modelInfo
// Retour : string
// Retourne "Model: {modelName}"
    public get modelInfo(): string {
        return `Model: ${this.modelName}`;
    }


}

export { GeminiClient };