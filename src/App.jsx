import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const defaultShift = 3; // Puedes cambiar este valor predeterminado
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const handleEncrypt = () => {
    if (message.trim() !== '') {
      setEncryptedMessage(encryptMessage(message, defaultShift));
      setMessage(''); // Limpiar el campo de texto
    } else {
      alert('Por favor, ingresa un mensaje antes de cifrar.');
    }
  };

  const handleDecrypt = () => {
    if (encryptedMessage.trim() !== '') {
      setDecryptedMessage(decryptMessage(encryptedMessage, defaultShift));
    } else {
      alert('No hay mensaje cifrado para descifrar.');
    }
  };

  // Función que cifra un mensaje utilizando el cifrado César
  const encryptMessage = (text, shift) => {
    return text
      .split('')
      .map((char) => {
        // Verifica si el carácter es una letra del alfabeto
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0); // Obtiene el código ASCII del carácter
          const shiftedCode = code + shift; // Aplica el desplazamiento al código ASCII

          // Verifica si el carácter es mayúscula (código ASCII entre 65 y 90)
          if (code >= 65 && code <= 90) {
            // Aplica el módulo para asegurarse de que el resultado esté en el rango de letras mayúsculas
            return String.fromCharCode(((shiftedCode - 65) % 26) + 65);
          } else {
            // Aplica el módulo para asegurarse de que el resultado esté en el rango de letras minúsculas
            return String.fromCharCode(((shiftedCode - 97) % 26) + 97);
          }
        } else {
          // Si el carácter no es una letra, se deja sin cambios
          return char;
        }
      })
      .join(''); // Une los caracteres cifrados de nuevo en un string
  };


  const decryptMessage = (text, shift) => {
    return encryptMessage(text, -shift);
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <label>Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
      <div className="result-container">
        <p>Encrypted Message: {encryptedMessage}</p>
        <p>Decrypted Message: {decryptedMessage}</p>
      </div>
    </div>
  );
}

export default App;
