import logo from './logo.svg';
import './App.css';



function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
      <One />
    </div>
  );
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

