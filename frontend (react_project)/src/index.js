import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './Components/Auth-context/AuthContext';
import { TimesContextProvider } from './Components/TimerComponent/Timer-Context/timer-context';
import { TodosContextProvider } from './Components/TodoComponent/Todo-Context/todo-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <TimesContextProvider>
                <TimesContextProvider>
                    <App />
                </TimesContextProvider>
            </TimesContextProvider>
        </AuthContextProvider>
     </React.StrictMode>
)

//ReactDOM.render(<App />, document.getElementById('root'));



