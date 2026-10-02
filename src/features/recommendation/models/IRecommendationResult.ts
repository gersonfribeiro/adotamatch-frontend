/**
 * @description Contrato de dados do resultado de recomendação com explicabilidade preventiva.
 * @property {number} petId - Identificador único do animal recomendado.
 * @property {string} petName - Nome do animal sob custódia.
 * @property {string} species - Espécie do animal (Cão ou Gato).
 * @property {string} size - Porte físico do animal.
 * @property {number} compatibilityScore - Pontuação final de compatibilidade normalizada entre 0 e 100.
 * @property {number} semanticScore - Escore semântico contextual apurado via LLM (0.0 a 1.0).
 * @property {string[]} alignmentFactors - Lista de fatores explicativos de afinidade entre o adotante e o animal.
 * @property {string[]} preventiveWarnings - Alertas preventivos de adaptação para evitar devoluções.
 * @property {string} shelterName - Nome do abrigo ou ONG mantenedora.
 * @property {string} shelterCity - Cidade do abrigo para contato.
 */
export interface IRecommendationResult {
  petId: number;
  petName: string;
  species: string;
  size: string;
  compatibilityScore: number;
  semanticScore: number;
  alignmentFactors: string[];
  preventiveWarnings: string[];
  shelterName: string;
  shelterCity: string;
}
