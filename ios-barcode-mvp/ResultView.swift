import SwiftUI

/// Affiche les détails d'un produit une fois scanné et récupéré.
struct ResultView: View {
    @EnvironmentObject private var viewModel: ProductViewModel

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                headerSection
                scoreSection
                ingredientsSection
            }
            .padding()
        }
        .navigationTitle("Résultat")
        .navigationBarTitleDisplayMode(.inline)
    }

    @ViewBuilder
    private var headerSection: some View {
        if let product = viewModel.product {
            VStack(alignment: .leading, spacing: 8) {
                AsyncImage(url: product.imageURL) { phase in
                    switch phase {
                    case .empty:
                        ProgressView()
                            .frame(maxWidth: .infinity, minHeight: 200)
                    case .success(let image):
                        image
                            .resizable()
                            .scaledToFit()
                            .frame(maxWidth: .infinity)
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                    case .failure:
                        placeholderImage
                    @unknown default:
                        placeholderImage
                    }
                }

                Text(product.name)
                    .font(.title.bold())
                Text("Code-barres : \(product.barcode)")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        } else if viewModel.isLoading {
            ProgressView("Chargement du produit…")
        } else if let error = viewModel.errorMessage {
            Label(error, systemImage: "exclamationmark.triangle.fill")
                .foregroundStyle(.red)
        } else {
            Text("Scanne un produit pour afficher ses informations.")
                .foregroundStyle(.secondary)
        }
    }

    private var scoreSection: some View {
        GroupBox("Score nutritionnel") {
            if let product = viewModel.product {
                VStack(alignment: .leading, spacing: 8) {
                    ProgressView(value: product.normalizedScore)
                        .tint(product.score >= 50 ? .green : .orange)
                    Text("Score : \(product.score)/100")
                        .font(.headline)
                }
            } else {
                Text("En attente de données…")
                    .foregroundStyle(.secondary)
            }
        }
    }

    private var ingredientsSection: some View {
        GroupBox("Ingrédients") {
            if let product = viewModel.product {
                Text(product.ingredients)
                    .font(.body)
            } else {
                Text("En attente de données…")
                    .foregroundStyle(.secondary)
            }
        }
    }

    private var placeholderImage: some View {
        RoundedRectangle(cornerRadius: 12)
            .fill(.quaternary)
            .overlay {
                Image(systemName: "photo")
                    .font(.largeTitle)
                    .foregroundStyle(.secondary)
            }
            .frame(maxWidth: .infinity, minHeight: 200)
    }
}

#Preview {
    NavigationStack {
        ResultView()
            .environmentObject(
                {
                    let vm = ProductViewModel()
                    vm.product = Product(
                        barcode: "1234567890123",
                        name: "Yaourt Bio Fraise",
                        imageURL: URL(string: "https://images.unsplash.com/photo-1585238341986-5024c2c1d1f0"),
                        ingredients: "Lait entier, fraises, sucre de canne, ferments lactiques",
                        score: 72
                    )
                    return vm
                }()
            )
    }
}
