import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./styles/index.css"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        React.createElement("div", { style: { padding: "2rem", textAlign: "center", fontFamily: "sans-serif" } },
          React.createElement("h2", null, "エラーが発生しました"),
          React.createElement("p", { style: { color: "red" } }, String(this.state.error)),
          React.createElement("p", null, "Vercelの環境変数（VITE_SUPABASE_URL、VITE_SUPABASE_ANON_KEY）が正しく設定されているか確認してください。")
        )
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(ErrorBoundary, null,
    React.createElement(React.StrictMode, null,
      React.createElement(App, null)
    )
  )
)

