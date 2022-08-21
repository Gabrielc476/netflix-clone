import React, { useEffect, useState } from 'react';
import tmdb from './tmdb';
import Movierow from './components/Movierow';
import Featuredmovie from './components/Featuredmovie'
import './App.css';
import Header from './components/Header';

const App = () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      let list = await tmdb.getHomeList()
      setMovieList(list)



      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let choseninfo = await tmdb.getMovieInfo(chosen.id, 'tv')

      setFeaturedData(choseninfo)

    }

    loadAll()
  }, [])
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      }
      else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])



  return(
    <div className='page'>

      <Header black={blackHeader}/>

      {featuredData &&
        <Featuredmovie item={featuredData}/>
      }

      <section className='lists'>
        {movieList.map((item,key) => (
          <Movierow key={key} title = {item.title} items= {item.items}/>
        ))}
      </section>
      <footer>
        Feito com <span role='img' aria-label='coração'>❤️</span> por Gabriel Castro<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos no site Themoviedb.org
      </footer>
      {movieList.length <= 0 &&    
        <div className='loading'>
          <img src='https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2_w200.gif' alt='carregando'></img>
        </div>
      } 
    </div>
  )
}

export default App