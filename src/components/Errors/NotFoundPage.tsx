import { Button } from "../ui/button";

function NotFoundPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center flex-col">
          <div className="">
            <img src="/assets/not-found.svg" alt="not found" className="w-72" />
          </div>
          <div className="text-center my-10 max-w-md">
            <h2 className="text-3xl font-bold">UH OH! You're lost.</h2>
            <p className="mt-5">
              The page you are looking for does not exist.
              <br /> How you got here is a mystery. But you can click the button
              below to go back to the homepage.
            </p>
            <Button className="mt-5 rounded-full" asChild>
              <a href="/">Go Home</a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
