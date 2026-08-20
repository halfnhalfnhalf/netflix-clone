import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Row from "@/components/Row";
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
    <div className="relative h-screen bg-[linear-gradient(to_bottom,rgba(20,20,20,0)_0%,rgba(20,20,20,.15)_15%,rgba(20,20,20,.35)_29%,rgba(20,20,20,.58)_44%,#141414_68%,#141414_100%)] lg:h-[140vh]">
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section>
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Movies" movies={actionMovies} />
          {/* My list */}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Horror Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
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
