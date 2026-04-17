import { useState, useEffect } from 'react';
import './App.css';
import ChatBot from "react-chatbotify";
import LlmConnector, { GeminiProvider } from "@rcb-plugins/llm-connector";
import { initializeApp } from "firebase/app";
import { TextField, Button, Container, List, Typography, Box } from '@mui/material';
import { db } from './firebase.js';
import Todo from './components/Todo.jsx';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import myfoto from './assets/chakra2.webp';

// Configurações Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCIR3QPeXMIrWYg1qRJY0fJlzGd3OkL0CE",
    authDomain: "tm16projectofinal.firebaseapp.com",
    projectId: "tm16projectofinal",
    storageBucket: "tm16projectofinal.firebasestorage.app",
    messagingSenderId: "516675824633",
    appId: "1:516675824633:web:5fd76f6c6c024565172b28"
};

initializeApp(firebaseConfig);

// Configurações Chatbot - PERSONALIZADO EM ROXO
const chatbotSettings = {
    general: { 
        embedded: false,
        primaryColor: "#8B00FF", // Roxo Vibrante
        secondaryColor: "#6a00c2", 
        fontFamily: "Arial, sans-serif"
    },
    header: { 
        title: "Guru",
        style: {
            backgroundColor: "#8B00FF",
            color: "#fff",
            fontWeight: "bold"
        }
    },
    bubble: {
        style: {
            backgroundColor: "#8B00FF",
        }
    },
    sendButton: {
        style: {
            backgroundColor: "#8B00FF",
        }
    },
    chatHistory: { storageKey: "example_single_theme" },
};

const chatbotFlow = {
    start: {
        message: "Olá! Sou o teu Guru. Posso guiar a tua energia hoje? S/N",
        path: "gemini",
    },
    gemini: {
        llmConnector: {
            provider: new GeminiProvider({
                mode: 'direct',
                model: 'gemini-2.5-flash',
                responseFormat: 'stream',
                apiKey: "AIzaSyBKGl5Liewp5LFh13WTiRsKP2JrkpoIluA",
            }),
            outputType: 'character',
        },
    },
};

const chatbotThemes = [{ id: "steel_and_chrome", version: "0.1.0" }];
const chatbotPlugins = [LlmConnector()];

const App = () => {
    const [colors] = useState([
        { id: 'muladhara', title: 'Raiz (Muladhara)', hex: '#FF0000' },
        { id: 'svadhisthana', title: 'Sacro (Svadhisthana)', hex: '#FF7F00' },
        { id: 'manipura', title: 'Plexo Solar (Manipura)', hex: '#FFFF00' },
        { id: 'anahata', title: 'Coração (Anahata)', hex: '#00FF00' },
        { id: 'vishuddha', title: 'Garganta (Vishuddha)', hex: '#00FFFF' },
        { id: 'ajna', title: 'Terceiro Olho (Ajna)', hex: '#0000FF' },
        { id: 'sahasrara', title: 'Coroa (Sahasrara)', hex: '#8B00FF' }
    ]);

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [votes, setVotes] = useState(new Array(colors.length).fill(0));

    useEffect(() => {
        const q = query(collection(db, 'TM16projectofinal'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTodos(snapshot.docs.map(doc => ({ id: doc.id, item: doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    const addTodo = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        await addDoc(collection(db, 'TM16projectofinal'), {
            todo: input,
            timestamp: serverTimestamp()
        });
        setInput('');
    };

    const handleVote = (index) => {
        const copy = [...votes];
        copy[index] += 1;
        setVotes(copy);
        document.documentElement.style.setProperty('--sky-color', colors[index].hex);
    };

    const handleReset = () => {
        setVotes(new Array(colors.length).fill(0));
        document.documentElement.style.setProperty('--sky-color', 'transparent');
    };

    const maxVotes = Math.max(...votes);
    const mostVotedIndex = votes.indexOf(maxVotes);
    const totalVotes = votes.reduce((a, b) => a + b, 0);

    return (
        <div className="app-container">
            {/* ChatBot com as definições de cor roxa */}
            <ChatBot 
                settings={chatbotSettings} 
                flow={chatbotFlow} 
                themes={chatbotThemes} 
                plugins={chatbotPlugins} 
            />

            <div className="sky-background"></div>
            <div className="color-overlay"></div>

            <div className="content-wrapper">
                <header>
                    <figure className="diff aspect-16/9" style={{ borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)' }}>
                        <div className="diff-item-1">
                            <img alt="Chakras Color" src={chakra2.webp} />;
                        </div>
                        <div className="diff-item-2">
                            <img 
                                alt="Chakras P&B" 
                                src={chakra2.webp} />;
                                style={{ filter: 'grayscale(100%)' }} 
                            
                        </div>
                        <div className="diff-resizer"></div>
                    </figure>

                    <h1>ALINHAMENTO CHAKRA</h1>
                    <h2>Ativa a tua energia e define as tuas metas</h2>
                    <button className="reset-btn" onClick={handleReset}>Limpar Energias</button>
                </header>

                <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                    <Box sx={{ 
                        background: 'rgba(255, 255, 255, 0.2)', 
                        backdropFilter: 'blur(10px)',
                        padding: '30px', 
                        borderRadius: '24px',
                        boxShadow: '0 8px 32px 0 rgba(139, 0, 255, 0.2)'
                    }}>
                        <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
                            ☯️ Intenções do Dia
                        </Typography>
                        
                        <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <TextField 
                                fullWidth
                                label="Partilha a tua vibração..." 
                                variant="filled" 
                                size="small" 
                                value={input}
                                onChange={e => setInput(e.target.value)} 
                                sx={{ background: '#fff', borderRadius: '8px' }}
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                sx={{ background: '#8B00FF', minWidth: '100px', '&:hover': { background: '#6a00c2' } }}
                            >
                                Adicionar
                            </Button>
                        </form>

                        <List sx={{ maxHeight: '300px', overflowY: 'auto', pr: 1 }}>
                            {todos.map(todo => (
                                <Todo key={todo.id} arr={todo} />
                            ))}
                        </List>
                    </Box>
                </Container>

                {totalVotes > 0 && (
                    <section className="winner-panel">
                        <div className="winner-content">
                            <span>ENERGIA PREDOMINANTE:</span>
                            <h2 style={{ color: colors[mostVotedIndex].hex }}>
                                {colors[mostVotedIndex].title}
                            </h2>
                            <p>{maxVotes} Ativações</p>
                        </div>
                    </section>
                )}

                <div className="colors-grid">
                    {colors.map((color, index) => (
                        <div 
                            key={color.id} 
                            className="color-card" 
                            onClick={() => handleVote(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="color-sample" style={{ backgroundColor: color.hex }}></div>
                            <h3>{color.title}</h3>
                            <div className="vote-count">
                                <span>✨ {votes[index]}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;