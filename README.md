# 🧠 AutoCommenter - VS Code Extension

AutoCommenter is a VS Code extension that uses an LLM (like [Ollama](https://ollama.com/)) to generate insightful comments for your code blocks. It helps developers quickly understand code functionality and improve documentation with minimal effort.

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/suto6/autocommenter.git
cd autocommenter  
```

---

2. **Install dependencies**

```bash
npm install  
```

3. **Compile the extension**  

```bash
npm run compile  
```

4. Press F5 to start the extension in a new Extension Development Host window.

## Usage  

1. Select a code block in your active file.
2. Open the command palette:  
   - `Ctrl + Shift + P` (Windows/Linux)  
   - `Cmd + Shift + P` (Mac)  

2. Type and select **Generate Comment**  

3. The generated comment will be inserted above the selected code line.
```
