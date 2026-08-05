const HODTable = () => {

    return (

        <div className="rx-hod-table-wrapper">

            <table className="rx-hod-table">

                <thead>

                    <tr>

                        <th>Employee ID</th>

                        <th>Name</th>

                        <th>Department</th>

                        <th>Qualification</th>

                        <th>Experience</th>

                        <th>Phone</th>

                        <th>Email</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td
                            colSpan="7"
                            className="rx-empty-row"
                        >

                            No HOD Data Available

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

};

export default HODTable;