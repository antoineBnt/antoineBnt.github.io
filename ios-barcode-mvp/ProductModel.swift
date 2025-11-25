import Foundation
import SwiftUI

/// Représentation simple d'un produit remonté par l'API.
struct Product: Identifiable {
    let id = UUID()
    let barcode: String
    let name: String
    let imageURL: URL?
    let ingredients: String
    let score: Int

    /// Score normalisé entre 0 et 100 pour une barre de progression.
    var normalizedScore: Double {
        min(max(Double(score), 0), 100) / 100.0
    }
}

/// ViewModel partagé entre le scanner et l'écran de résultats.
final class ProductViewModel: ObservableObject {
    @Published var scannedCode: String?
    @Published var product: Product?
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?

    /// Simule l'appel API pour récupérer un produit à partir d'un code-barres.
    /// Remplace `fetchProduct` par ton appel réseau réel (URLSession, async/await, etc.).
    @MainActor
    func fetchProduct(for code: String) async {
        scannedCode = code
        isLoading = true
        errorMessage = nil

        do {
            // Ajoute ici ton propre appel réseau.
            // Ce placeholder simule un délai pour l'appel API.
            try await Task.sleep(nanoseconds: 800_000_000)

            // Exemple de réponse fictive.
            let mockProduct = Product(
                barcode: code,
                name: "Yaourt Bio Fraise",
                imageURL: URL(string: "https://images.unsplash.com/photo-1585238341986-5024c2c1d1f0"),
                ingredients: "Lait entier*, fraises* (10%), sucre de canne*, ferments lactiques. (*issu de l'agriculture biologique)",
                score: 72
            )

            product = mockProduct
        } catch {
            errorMessage = "Impossible de récupérer le produit"
        }

        isLoading = false
    }
}
