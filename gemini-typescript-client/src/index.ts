// TODO: Importez GeminiClient et les types nécessaires
import { GeminiClient } from './models/GeminiClient';
import { RequestOptions, SuccessResponse, ErrorResponse, ApiResponse, Statistics } from './types/gemini.types';
import "dotenv/config";

// TODO: Créez une fonction principale async
async function main() {
  // 1. Initialisez le client avec votre clé API
  // const apiKey = "VOTRE_CLE_API"; // À remplacer
  const apiKey = process.env.GEMINI_API_KEY ?? "";
  console.log("Clé détectée (longueur) :", apiKey.length); 
// Si ça affiche 0, c'est que le fichier .env n'est pas lu.
  
  // 2. Créez une instance de GeminiClient avec le modèle "gemini-2.5-flash-lite"
  const client = new GeminiClient(apiKey, "gemini-2.5-flash-lite", true);
  
  // 3. Testez plusieurs requêtes avec différentes configurations
  const prompts = ["salut fais moi une blague", "donne moi 10 raison pour rester avec mael"];
  
  await client.ask({
    prompt: prompts[0],
    config: { temperature: 0.2, maxOutputTokens: 500 }
  });
  
  // 4. Affichez les statistiques
  console.log(client.getStats());
  
  // 5. Gérez les erreurs
  try {
    const response = await client.ask({
      prompt: prompts[1],
      config: { temperature: 0.9, maxOutputTokens: 300 }
    });
    
    if (response.success) {
      console.log("Réponse réussie :", response.data);
    } else {
      console.error("Erreur API :", response.error);
    } 
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }

  // Affichage final des stats après la deuxième requête
  console.log("Stats finales :", client.getStats());
}

// TODO: Appelez la fonction main
// Votre code ici
main().catch(console.error);