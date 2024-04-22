import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SignatureCreator from "./components/SignatureCreator/SignatureCreator";

export default function Home() {
  return (
    <div className="bg-white h-screen flex min-h-screen flex-col">
      <Header />

      <div className="flex font-sans pt-2 text-gray-700 items-center justify-center text-xl md:text-3xl font-bold text-gray-800">
        Draw your eSignature here
      </div>
      <SignatureCreator />

      <Footer />
    </div>
  );
}
