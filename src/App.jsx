import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import TictactoGame from './TictactoGame';


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

export default function MyApp() {
  const [count, setCount] = useState(0);
  const [showGame, setShowGame] = useState(false);

  function handleClick() {
    setCount(count + 1);
  }

  function handleGoToGame() {
    setShowGame(true);
  }

  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
      <One />
      <ShoppingList />
      {showGame ? (
        <TictactoGame />
      ) : (
        <MyButton2 onClick={handleGoToGame} />
      )}
    </div>
  );

  function MyButton({ count, onClick }) {
    return (
      <button onClick={onClick}>
        Clicked {count} times
      </button>
    );
  }
  function MyButton2({ onClick }) {
    const handleInternalClick = () => {
      alert('게임 시작!');
      onClick();
    };

    return (
      <button onClick={handleInternalClick}>
        TictactoGame 시작하기
      </button>
    );
  }
}

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

