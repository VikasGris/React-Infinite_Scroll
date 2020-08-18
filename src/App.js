import React, {useState, useEffect, useRef} from 'react';
import Loading from './loading.gif';

function App() {

  const [photos, setPhotos] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(false)

  
  const fetchPhotos = async(pageNumber) =>{
    const Access_Key ="aW3i7EQMK8VW0k41jf3zIwohLZRN_J5iIckrB4BJRu0"
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${pageNumber}&per_page=10`)
    const data = await res.json()
    console.log(data)
    setPhotos(p => [...p, ...data])
    setLoading(true)
  }

  const pageEnd = useRef()

  useEffect(() =>{
    fetchPhotos(pageNumber);
  },[pageNumber])

  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber+1)
  }

  useEffect(() =>{
    if(loading){
      const observer = new IntersectionObserver(entries =>{
          if(entries[0].isIntersecting){
            loadMore();
          }
      },{threshold: 1});
      observer.observe(pageEnd.current)
    }
  },[loading])
  return (
    <div className="App">
      <h1>Infinite Scroll</h1>
      {
        photos.map((photo,index) =>(
          <div className="photos" key={index}>
            <img src={photo.urls.small} alt=""/>
            <p>{photo.user.first_name + ' ' + photo.user.last_name}</p>
            <span>Download: {photo.links.download} </span>

          </div>
        ))
      }
      <div className="loading">
        <img src={Loading} alt=""/>

      </div>
      <h3>{photos.length}</h3>
      <button onClick={loadMore} ref={pageEnd}>
        Load More
      </button>
    </div>
  );
}

export default App;
