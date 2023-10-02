import "./App.css";
import MyForm from "./components/Form/Form";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<MyForm />
				<p>Just a test for a pwa applications with react and typescript</p>
				<a
					className="App-link"
					href="https://linktr.ee/apenasgabs"
					target="_blank"
					rel="noopener noreferrer"
				>
					About me{" "}
				</a>
			</header>
		</div>
	);
}

export default App;
