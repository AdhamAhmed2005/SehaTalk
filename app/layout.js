import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../lib/i18n/LanguageProvider.jsx";
import { Navbar } from "../components/Navbar.jsx";
import DocumentDirection from "../components/DocumentDirection.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SehaTalk - منصة الاستشارات الطبية",
  description:
    "اسأل الأطباء المعتمدين واحصل على استشارات طبية موثوقة - Ask verified doctors and get trusted medical consultations",
  keywords:
    "طبيب، استشارة طبية، صحة، أسئلة طبية، doctor, medical consultation, health, medical questions",
};

function LayoutContent({ children }) {
  return (
    <LanguageProvider>
      <DocumentDirection />
      <Navbar />
      {children}
    </LanguageProvider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={inter.className}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
