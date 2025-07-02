export default function Home() {
  return (
    <main style={{ 
      padding: "2rem", 
      fontFamily: "Arial, sans-serif", 
      textAlign: "center" 
    }}>
      <img src="/logo.png" alt="BlockBuilt.ai Logo" width={180} />
      <h1>Welcome to BlockBuilt.ai</h1>
      <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        Built from Experience. Backed by Intelligence.
      </p>
    </main>
  );
}
