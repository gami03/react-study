import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import TictactoGame from './pages/TictactoGame';
import Componenet from './pages/component';


// function MyButton() {
//   const [count, setCount] = useState(0);

//   function handleClick() {
//     setCount(count + 1);
//   }
//   return (
//     <button onClick={handleClick}>
//       Clicked {count} times
//     </button>
//   );
// }

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
          <Link to="/" style={{ marginRight: '10px' }}>홈</Link>
          <Link to="/game" style={{ marginRight: '10px' }}>틱택토</Link>
          <Link to="/about" style={{ marginRight: '10px' }}>내 정보</Link>
          <Link to="/component">컴포넌트</Link>
        </nav>

        {/* 경로에 따라 바뀌는 영역 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<TictactoGame />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/component" element={<Componenet />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// 홈 화면 컴포넌트
function Home() {
  const navigate = useNavigate();

  return (
    <header className="App-header">
      <h1>보감님의 리액트 연습장</h1>
      <p>원하는 메뉴를 선택하세요.</p>
      <button onClick={() => navigate('/game')}>틱택토 하러 가기</button>
      <button onClick={() => navigate('/about')} style={{ marginLeft: '10px' }}>정보 보기</button>
      <button onClick={() => navigate('/component')}>컴포넌트</button>
    </header>
  );
}

  // function MyButton({ count, onClick }) {
  //   return (
  //     <button onClick={onClick}>
  //       Clicked {count} times
  //     </button>
  //   );
  // }
  // function MyButton2({ onClick }) {
  //   const handleInternalClick = () => {
  //     alert('게임 시작!');
  //     onClick();
  //   };

  //   return (
  //     <button onClick={handleInternalClick}>
  //       TictactoGame 시작하기
  //     </button>
  //   );
  // }


function AboutPage() {
  const imageUrl = "https://images.dog.ceo/breeds/retriever-golden/n02099601_10.jpg";
  return (
    <>
      <img className="avatar" />
      <h1>About</h1>
      <table border={3}>
        <tr>
            <th>사진</th>
            <td>
              <img 
                src={imageUrl} 
                alt="골든 리트리버" 
                className="avatar"
                style={{ width: '200px' }}
              />
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td>보감</td>
          </tr>
        
      </table>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize: 90,
};

 function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}

const isLoggedIn = true;
function One() {
  return (
    <div>
      {isLoggedIn ? (
        <AboutPage />
      ) : (
        <Profile />
      )}
    </div>
  )
}


const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

// function MyButton2() {
//   function handleClick() {
//     alert('You Clicked me!');
//   }

//   return (
//     <button onClick={handleClick}>
//       Click me
//     </button>
//   );
// }

