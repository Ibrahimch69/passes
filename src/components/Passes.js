import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function Passes() {
    const [passes, setPasses] = useState([]);

    useEffect(() => {
        fetch('https://admin.neostore.cloud/api/demo/passes?pageIndex=0&pageSize=20', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '0L0pLvWByOnxU7weByZAjxhMfeIHv_r-oVZ2wgSvzK9c3ixgqoKG1ntNdLXACYoY'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setPasses(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const passesByType = passes.reduce((accumulator, pass) => {
        accumulator[pass.passType] = (accumulator[pass.passType] || 0) + 1;
        return accumulator;
    }, {});

    return (
        <div>
            <h2>Passes</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Pass ID</th>
                        <th>Creation Date</th>
                        <th>Pass Type</th>
                        <th>Nombre de Passes par Type</th>
                    </tr>
                </thead>
                <tbody>
                    {passes.map((pass) => (
                        <tr key={pass.passId}>
                            <td>{pass.id}</td>
                            <td>{pass.creationDate}</td>
                            <td>{pass.passType}</td>
                            <td>{passesByType[pass.passType]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Passes;
