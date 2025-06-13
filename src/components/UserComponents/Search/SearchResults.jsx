import React from "react";  
import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchEvents } from "../../../services/user/userEventServices";    

const SearchResultsPage = () => {
    const [params] = useSearchParams();
    const query = params.get("query");
    const [ results, setResults ] = useState([]);

    useEffect(() => {
        if ( query ) {
            (async () => {
                const data = await searchEvents(query,1,6);
                if ( data.success ) {
                    setResults(data.events);
                }
            })();
        }
    }, [ query]);

    return (
        <div>
            <h2>search results for "{query}"</h2>
            { results.length == 0 ? (
                <p>No Events found.</p>
            ) : (
                results.map((event) => (
                    <div key={event._id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>{event.location}</p>
                    </div>
                ))
            ) } 
        </div>
    );

}

export default SearchResultsPage;