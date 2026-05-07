import React, { useEffect, useState } from 'react'
import API from '../API';

const RecentActivity = () => {
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        API.get('/recent-activity')
            .then((res) => setActivity(res.data))
            .catch(console.log);
    }, []);

    return (
        <div className="bg-white p-5 rounded shadow mt-10">
            <h2 className="text-xl font-bold mb-5">
                Recent Activity
            </h2>

            <div className="flex flex-col gap-4">

                {activity.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between border-b pb-3"
                    >

                        <div>
                            {item.type === "post" ? (
                                <p>
                                    📝 New post created:
                                    <span className="font-semibold">
                                        {" "} {item.title}
                                    </span>
                                </p>
                            ) : (
                                <p>
                                    📩 New subscriber:
                                    <span className="font-semibold">
                                        {" "} {item.email}
                                    </span>
                                </p>
                            )}
                        </div>

                        <small className="text-gray-500">
                            {new Date(item.created_at).toLocaleDateString()}
                        </small>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default RecentActivity