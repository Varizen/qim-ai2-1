export default function Success() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-gray-600">Thank you for subscribing to QiM-AI2.1.</p>
      <a href="/dashboard" className="mt-6 inline-block text-blue-600 hover:underline">
        Go to Dashboard
      </a>
    </main>
  );
}
