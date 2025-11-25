import SwiftUI

/// Point d'entrée principal de l'app : navigation entre le scanner et le résultat.
struct ContentView: View {
    @StateObject private var viewModel = ProductViewModel()
    @State private var path: [String] = []

    var body: some View {
        NavigationStack(path: $path) {
            ScannerView { code in
                Task {
                    await viewModel.fetchProduct(for: code)
                    // Navigue vers l'écran de résultats dès que l'appel API est terminé.
                    await MainActor.run {
                        path.append("result")
                    }
                }
            }
            .environmentObject(viewModel)
            .navigationDestination(for: String.self) { route in
                if route == "result" {
                    ResultView()
                        .environmentObject(viewModel)
                }
            }
            .navigationTitle("Scan produit")
        }
    }
}

#Preview {
    ContentView()
}
