import Navbar from "../components/navbar";

export const NotFound = () => {
  return (
    <main
      style={{
        backgroundImage: "url(/static/images/notFound.svg)",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
    </main>
  );
};
