import Banner from "@/components/Banner";
import Header from "@/components/Header";
import requests from "@/utils/requests";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

export default async function Home() {
  const {
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  } = await getData();

  return (
    <div className="relative h-screen bg-linear-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section>
          {/* row */}
          {/* row */}
          {/* row */}
          {/* row */}
          {/* row */}
          {/* row */}
          {/* row */}
        </section>
      </main>
      {/* modal */}
    </div>
  );
}

async function getData() {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals, { cache: "no-store" }).then((res) =>
      res.json(),
    ),
    fetch(requests.fetchTrending, { cache: "no-store" }).then((res) =>
      res.json(),
    ),
    fetch(requests.fetchTopRated, { cache: "no-store" }).then((res) =>
      res.json(),
    ),
    fetch(requests.fetchActionMovies, { cache: "no-store" }).then((res) =>
      res.json(),
    ),
    fetch(requests.fetchComedyMovies, { cache: "no-store" }).then((res) =>
      res.json(),
    ),
    fetch(requests.fetchHorrorMovies, { cache: "no-store" }).then((res) =>
      res.json(),
    ),
    fetch(requests.fetchRomanceMovies, { cache: "no-store" }).then((res) =>
      res.json(),
    ),
    fetch(requests.fetchDocumentaries, { cache: "no-store" }).then((res) =>
      res.json(),
    ),
  ]);

  return {
    netflixOriginals: netflixOriginals.results,
    trendingNow: trendingNow.results,
    topRated: topRated.results,
    actionMovies: actionMovies.results,
    comedyMovies: comedyMovies.results,
    horrorMovies: horrorMovies.results,
    romanceMovies: romanceMovies.results,
    documentaries: documentaries.results,
  };
}
