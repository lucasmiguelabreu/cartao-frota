import "@/app/styles/globals.css";

export const metadata = {
  title: "Cartão Frota",
  description: "Encontre estabelecimentos que aceitam o Cartão Frota",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" sizes="64x64" />
      </head>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
