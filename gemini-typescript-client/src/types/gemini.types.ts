// TODO: Définissez les types suivants avec des annotations explicites

// 1. Type pour la clé API (string)
type apiKey = string;

// 2. Type pour le nom du modèle avec inférence
// Initialisez une variable avec "gemini-2.5-flash-lite"
const modelName = "gemini-2.5-flash-lite";

// 3. Types spéciaux
// - Un type pour un timestamp (number)
type timestamp = number;
// - Un type pour un flag de debug (boolean)
type debug = boolean;
// - Un type any pour des métadonnées génériques
type metadata = any;
// - Un type unknown pour des réponses brutes
type rawResponse = unknown;
// Votre code ici

// 4. Export des types
export type { apiKey, modelName, timestamp, debug, metadata, rawResponse };

// TODO: Créez un enum pour les rôles de messages
// Valeurs possibles : USER, MODEL, SYSTEM
// Votre code ici
enum MessageRole { USER, MODEL, SYSTEM };

// TODO: Créez un enum pour les niveaux de température
// LOW = 0.2, MEDIUM = 0.7, HIGH = 1.0
// Votre code ici
enum TemperatureLevel { LOW = 0.2, MEDIUM = 0.7, HIGH = 1.0 };

// TODO: Définissez un type pour un message
// Propriétés :
// - role: utiliser l'enum MessageRole
// - content: string
// - timestamp: number
// Votre code ici
type Message = {
    role: MessageRole;
    content: string;
    timestamp: number;
};

// TODO: Définissez un type pour l'historique des messages
// C'est un tableau de Message
// Votre code ici
type msgHistory = Message[];


// TODO: Définissez un type pour la configuration de génération
// Propriétés :
// - temperature: number
// - maxOutputTokens: number
// - topK: number (optionnel)
// - topP: number (optionnel)
// Votre code ici
type generationConfig = {
    temperature: number;
    maxOutputTokens: number;
    topK?: number;
    topP?: number;
}

// TODO: Définissez un type pour les métadonnées de réponse
// Propriétés :
// - model: string
// - tokensUsed: number
// - finishReason: string (optionnel)
// Votre code ici

type responseMetadata = {
    model: string;
    tokensUsed: number;
    finishReason?: string;
}

// TODO: Créez une interface pour les options de requête
// Propriétés :
// - prompt: string
// - config: GenerationConfig (optionnel)
// - history: MessageHistory (optionnel)
// Votre code ici

interface RequestOptions {
    prompt: string;
    config?: generationConfig;
    history?: msgHistory;
}

// TODO: Créez une interface pour une réponse réussie
// Propriétés :
// - success: true (literal type)
// - data: string
// - metadata: ResponseMetadata
// Votre code ici

interface SuccessResponse {
    success: true;
    data: string;
    metadata: responseMetadata;
}

// TODO: Créez une interface pour une réponse échouée
// Propriétés :
// - success: false (literal type)
// - error: string
// - code: number
// Votre code ici
interface ErrorResponse {
    success: false;
    error: string;
    code: number;
}

// TODO: Créez un type union pour ApiResponse
// Peut être soit SuccessResponse soit ErrorResponse
// Votre code ici
type ApiResponse = SuccessResponse | ErrorResponse;

// TODO: Créez une interface pour les statistiques
// Propriétés :
// - totalRequests: number
// - successfulRequests: number
// - failedRequests: number
// - averageResponseTime: number
// Votre code ici
interface Statistics {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number;
}

// TODO: Créez une fonction de casting pour vérifier si une réponse est un succès
// Fonction : isSuccessResponse(response: ApiResponse): response is SuccessResponse
// Votre code ici
function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
    return response.success;
}

export { MessageRole, TemperatureLevel, Message, msgHistory, generationConfig, responseMetadata, RequestOptions, SuccessResponse, ErrorResponse, ApiResponse, Statistics, isSuccessResponse };

// TODO: Créez un type Partial pour une configuration optionnelle
// Nom : PartialConfig
// Basé sur GenerationConfig mais toutes les propriétés optionnelles
// Votre code ici
type PartialConfig = Partial<generationConfig>;

// TODO: Créez un type Required pour forcer toutes les propriétés
// Nom : RequiredConfig
// Basé sur GenerationConfig mais toutes les propriétés obligatoires
// Votre code ici
type RequiredConfig = Required<generationConfig>;

// TODO: Créez un type Readonly pour une configuration immutable
// Nom : ImmutableConfig
// Basé sur GenerationConfig
// Votre code ici
type ImmutableConfig = Readonly<generationConfig>;

// TODO: Créez un type Pick pour ne garder que certaines propriétés
// Nom : MinimalMessage
// Basé sur Message mais seulement role et content
// Votre code ici
type MinimalMessage = Pick<Message, 'role' | 'content'>;

// TODO: Créez un type Omit pour exclure certaines propriétés
// Nom : MessageWithoutTimestamp
// Basé sur Message mais sans timestamp
// Votre code ici
type MessageWithoutTimestamp = Omit<Message, 'timestamp'>;

// TODO: Créez un type Record pour un dictionnaire de modèles
// Nom : ModelRegistry
// Clés : string, Valeurs : { name: string, description: string }
// Votre code ici
type ModelRegistry = Record<string, { name: string; description: string }>;

export { PartialConfig, RequiredConfig, ImmutableConfig, MinimalMessage, MessageWithoutTimestamp, ModelRegistry };