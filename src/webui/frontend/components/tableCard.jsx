import React from 'react';

const TableCard = (props) => {
    const {
        name,
        desc,
        tableData,
    } = props;
    return (
        <div class="card">
            <div class="card-header card-header-primary">
                <h4 class="card-title">{name}</h4>
                <p class="card-category">{desc}</p>
            </div>
            <div class="card-body table-responsive">
                <table class="table table-hover">
                    <thead class="text-warning">
                        <th>ID</th>
                        <th>Name</th>
                    </thead>
                    <tbody></tbody>
                    {tableData.map((data) => (
                        <tr>
                            <td>data.id</td>
                            <td>data.name</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default TableCard;
