import './App.css';

function App() {
  return (
    <>
    <section>
      <nav className='navBar'>
        <div id="tenki">
          <img src="https://img.icons8.com/pulsar-line/144/FFFFFF/partly-cloudy-day.png" alt="Tenki"/>
          <h1>Tenki</h1>
        </div>
        <ul id='navBtns'>
          <li><button className='navBtn'>Home</button></li>
          <li><button className='navBtn'>About</button></li>
          <li><button className='navBtn'>Settings</button></li>
        </ul>
      </nav>
    </section>
    </>
  )
}

export default App;