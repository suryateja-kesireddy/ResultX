import { Search } from "lucide-react";

const HODSearch = () => {

    return (

        <div className="rx-hod-search">

            <Search
                size={20}
                className="rx-search-icon"
            />

            <input

                type="text"

                placeholder="Search by Name, Employee ID, Email or Phone"

            />

        </div>

    );

};

export default HODSearch;