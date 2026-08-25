"use client";

import { modalState } from "@/atoms/modalAtom";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Plans from "@/components/Plans";
import Row from "@/components/Row";
import useAuth from "@/hooks/useAuth";
import useSubscription from "@/hooks/useSubscription";
import { products } from "@/lib/stripe";
import requests from "@/utils/requests";
import { Product } from "@invertase/firestore-stripe-payments";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
}

export default function Home() {
  const [movies, setMovies] = useState({
    netflixOriginals: [],
    trendingNow: [],
    topRated: [],
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    romanceMovies: [],
    documentaries: [],
  });
  const { loading, user } = useAuth();
  const showModal = useAtomValue(modalState);
  const subscription = useSubscription(user)

  async function setData() {
    setMovies(await getData());
  }

  useEffect(() => {
    setData();
  }, []);

  if (loading || subscription === null) return null;

  if (!subscription && products !== undefined) {
    return <Plans products={products} />;
  }

  return (
    <div className="relative h-screen bg-[linear-gradient(to_bottom,rgba(20,20,20,0)_0%,rgba(20,20,20,.15)_15%,rgba(20,20,20,.35)_29%,rgba(20,20,20,.58)_44%,#141414_68%,#141414_100%)] lg:h-[140vh]">
      <title>Home - Netflix Clone</title>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={movies.netflixOriginals} />
        <section>
          <Row title="Trending Now" movies={movies.trendingNow} />
          <Row title="Top Rated" movies={movies.topRated} />
          <Row title="Action Movies" movies={movies.actionMovies} />
          {/* My list */}
          <Row title="Comedies" movies={movies.comedyMovies} />
          <Row title="Horror Movies" movies={movies.horrorMovies} />
          <Row title="Romance Movies" movies={movies.romanceMovies} />
          <Row title="Documentaries" movies={movies.documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
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
