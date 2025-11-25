import SwiftUI
import AVFoundation

/// Vue responsable du flux caméra et de la détection des codes-barres.
struct ScannerView: View {
    @EnvironmentObject private var viewModel: ProductViewModel
    var onCodeScanned: (String) -> Void

    @State private var cameraAuthorized: Bool = false
    @State private var showPermissionAlert: Bool = false

    var body: some View {
        ZStack {
            if cameraAuthorized {
                CameraView(onCodeFound: handleCode)
                    .ignoresSafeArea()
            } else {
                PermissionPlaceholder()
            }

            if viewModel.isLoading {
                ProgressView("Recherche du produit…")
                    .padding()
                    .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12))
            }
        }
        .onAppear(perform: requestCameraAccess)
        .alert("Accès caméra nécessaire", isPresented: $showPermissionAlert) {
            Button("OK", role: .cancel) {}
        } message: {
            Text("Active la caméra dans Réglages pour scanner les codes-barres.")
        }
    }

    private func handleCode(_ code: String) {
        // Evite les scans multiples sur la même session.
        guard viewModel.scannedCode != code else { return }
        onCodeScanned(code)
    }

    private func requestCameraAccess() {
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized:
            cameraAuthorized = true
        case .notDetermined:
            AVCaptureDevice.requestAccess(for: .video) { granted in
                DispatchQueue.main.async {
                    cameraAuthorized = granted
                    showPermissionAlert = !granted
                }
            }
        default:
            showPermissionAlert = true
        }
    }
}

// MARK: - Sous-vues

/// Placeholder affiché quand la permission caméra est manquante.
private struct PermissionPlaceholder: View {
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "camera.viewfinder")
                .font(.system(size: 64))
                .foregroundStyle(.secondary)
            Text("Active la caméra pour commencer le scan")
                .multilineTextAlignment(.center)
                .padding(.horizontal)
        }
        .padding()
    }
}

/// Vue qui encapsule `AVCaptureSession` via `UIViewRepresentable` pour SwiftUI.
private struct CameraView: UIViewRepresentable {
    let onCodeFound: (String) -> Void

    func makeUIView(context: Context) -> PreviewView {
        let view = PreviewView()
        context.coordinator.startSession(on: view.layer)
        return view
    }

    func updateUIView(_ uiView: PreviewView, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator(onCodeFound: onCodeFound)
    }

    final class Coordinator: NSObject, AVCaptureMetadataOutputObjectsDelegate {
        private let session = AVCaptureSession()
        private let onCodeFound: (String) -> Void
        private var isProcessingCode = false

        init(onCodeFound: @escaping (String) -> Void) {
            self.onCodeFound = onCodeFound
            super.init()
        }

        func startSession(on layer: CALayer) {
            guard let device = AVCaptureDevice.default(for: .video),
                  let input = try? AVCaptureDeviceInput(device: device) else {
                return
            }

            session.beginConfiguration()
            if session.canAddInput(input) { session.addInput(input) }

            let output = AVCaptureMetadataOutput()
            if session.canAddOutput(output) { session.addOutput(output) }

            output.setMetadataObjectsDelegate(self, queue: .main)
            output.metadataObjectTypes = [.ean13, .qr, .code128, .ean8, .upce]

            session.commitConfiguration()

            let previewLayer = AVCaptureVideoPreviewLayer(session: session)
            previewLayer.videoGravity = .resizeAspectFill
            previewLayer.frame = layer.bounds
            layer.addSublayer(previewLayer)

            session.startRunning()
        }

        func metadataOutput(_ output: AVCaptureMetadataOutput,
                            didOutput metadataObjects: [AVMetadataObject],
                            from connection: AVCaptureConnection) {
            guard !isProcessingCode,
                  let object = metadataObjects.first as? AVMetadataMachineReadableCodeObject,
                  let value = object.stringValue else { return }

            isProcessingCode = true
            AudioServicesPlaySystemSound(SystemSoundID(kSystemSoundID_Vibrate))
            onCodeFound(value)

            // Laisse un petit délai pour éviter les scans multiples.
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                self.isProcessingCode = false
            }
        }
    }
}

/// UIView qui contient simplement le CALayer du preview AVFoundation.
private final class PreviewView: UIView {
    override class var layerClass: AnyClass { AVCaptureVideoPreviewLayer.self }
}
