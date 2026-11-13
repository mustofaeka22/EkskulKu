export default function Loading() {
  return (
    <main className="min-h-screen p-6 md:p-12 bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600 font-medium">Memuat data EkskulKu...</p>
      </div>
    </main>
  );
}