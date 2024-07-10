import React, { useState } from 'react';

const Counter = () => {
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const runPoseCounter = async () => {
        try {
            const response = await fetch('http://8000/run_pose_counter');
            const data = await response.json();
            setOutput(data.output);
            setError(data.error);
        } catch (error) {
            console.error('Error running pose counter:', error);
            setError(error.toString());
        }
    };

    return (
        <div>
            <h1>Pose Counter</h1>
            <button type="submit" className="btn btn-primary"onClick={runPoseCounter}>Run Pose Counter</button>
            <pre>{output}</pre>
            {error && <pre style={{ color: 'red' }}>{error}</pre>}
        </div>
    );
};

export default Counter;
