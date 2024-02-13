import * as React from 'react'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import Header from "./Components/Header";
import './css/index.scss'
import Mainswiper from './Components/Mainswiper';
import './data/Mainswiper.json'
import Sproduct from "./Components/Sproduct";
import Product from "./Components/Product";
import Scrollimg from "./Components/Scrollimg";
import Scrollimg2 from "./Components/Scrollimg2";
import Youtubev from './Components/Youtubev'
import Promotion from './Link/Promotion';
import Mbenefit from "./Components/Mbenefit";
import Awards from "./Components/Awards";
import Reviews from "./Components/Reviews";
import Footer from "./Components/Footer";
import Login from "./Link/Login";
import Brandstory from "./Link/brandstory";
import Store from './Link/Store';
//data
import review from './data/review.json';
import award from './data/award.json'







function App() {
  const [totalpro, settotal] = useState<number[]>([]);
  const [catepro, setcate] = useState<number[]>([]);



  useEffect(() => {
    const fetchcookie = async () => {
      let totalprodata = [];
      let cateprodata = [];
      const savetotal = Cookies.get('totalpro');
      const savecate = Cookies.get('catepro');
      if (savetotal) {
        try {
          totalprodata = JSON.parse(savetotal);
        } catch (error) {
          console.error("totalpro 파싱 오류", error)
        }
      }
      if (savecate) {
        try {
          cateprodata = JSON.parse(savecate);
        } catch (error) {
          console.error("catepro 파싱 오류", error)
        }
      }
      if (totalprodata.length > 0) {
        settotal(totalprodata)
      }
      if (cateprodata.length > 0) {
        setcate(cateprodata);
      }



    }
    fetchcookie();

    const dbstore = async (r: string, t: string, cate = "all") => {
      try {
        let result;
        if (cate !== "all") {
          result = await axios.get(`/${r}/${t}/${cate}`, { /* ... */ });
          settotal(result.data);
          Cookies.set('totalpro', JSON.stringify(result.data), { expires: 10 });
        } else {
          result = await axios.get(`/${r}/${t}`, { /* ... */ });
          setcate(result.data);
          Cookies.set('catepro', JSON.stringify(result.data), { expires: 10 }); // 여기를 수정했습니다.
        }
      } catch (error) {
        console.error(error);
      }
    };

    const category_no = async () => {
      try {

        const catename = await axios.get('/store/Category', {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            param: "아무거나"
          }
        });
        setcate([...catename.data])



          ;
      } catch (error) {
        console.log(error);
      }
    };
    dbstore("store", "Scinic_Product");
    category_no();
    console.log();

  }, []);


  return (
    <>
      <Header datasrc={catepro && catepro}></Header>
      <Routes>
        <Route path="/" element={<section className='mainsec'>
          <Mainswiper></Mainswiper>
          <Sproduct datasrc={totalpro && totalpro}></Sproduct>

          <div className="mb-5">
            <Scrollimg></Scrollimg>
            <Scrollimg2></Scrollimg2>
          </div>
          <Youtubev></Youtubev>
          <Product datasrc={totalpro && totalpro} catesrc={catepro && catepro}></Product>
          <Mbenefit></Mbenefit>
          <Reviews datasrc={review.review}></Reviews>
          <Awards datasrc={award.award}></Awards>
        </section>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/brand" element={<Brandstory />}></Route>
        <Route path='/promotion' element={<Promotion />}></Route>
        <Route path='/store/:Category_no' element={<Store datasrc={totalpro && totalpro} catesrc={catepro && catepro} />}></Route>

      </Routes>
      <Footer></Footer>


    </>
  );
}

export default App;
