import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { GiPayMoney } from "react-icons/gi";
import { MdPayments, MdPayment } from "react-icons/md";
import apiClient from '../utils/request';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer }
    from 'recharts';
interface ChartsProps {
    openModal: (content: string) => void;
}

interface Income {
    createdBy: string;
    job_title: string;
    salary: number;
    __v: number;
    _id: string;
};

interface Category {
    _id: string;
    name: string;
    amount: number;
    __v: number;
    createdBy: string;
};


function Charts({ }: ChartsProps) {
    const [currentIncome, setCurrentIncome] = useState<Income[]>([]);
    const [currentCategory, setCurrentCategory] = useState<Category[]>([]);
    const [totalPayment, setTotalPayment] = useState(0);
    const [reminder, setReminder] = useState(0);
    const [data, setData] = useState<{ name: string; uv: number }[]>([]);

    const getIncomes = async () => {
        const token = localStorage.getItem("token");
        const response = await apiClient<{ msg: Income[] }>("/income", {}, "GET", token as string);
        const incomes = response.msg;
        setCurrentIncome(incomes);
    };

    const getCategories = async () => {
        const token = localStorage.getItem("token");
        const response = await apiClient<{ msg: Category[] }>("/category", {}, "GET", token as string);
        const categories = response.msg;
        const categoryData = categories.map(category => ({
            name: category?.name ?? "",
            uv: category?.amount ?? 0
        }))
        setData(categoryData)
        const payment = categories.reduce((acc, category) => acc + category.amount, 0);
        setTotalPayment(payment);
        setCurrentCategory(categories);
    };



    useEffect(() => {
        getIncomes();
        getCategories();
    }, []);

    useEffect(() => {
        (typeof currentIncome[0]?.salary === 'number' && typeof totalPayment === 'number') ? setReminder(currentIncome[0].salary - totalPayment) : setReminder(0);
        console.log(data, "this is  the end data")
    }, [currentIncome, currentCategory, data]);


    return (
        <main className="main-container">
            <div className="main-title">
                <h3>Current Job: {currentIncome[0]?.job_title}</h3>
            </div>

            <div className="main-cards">
                <div className='card'>
                    <div className="card-inner">
                        <h3>Monthly Incomes</h3>
                        <GiPayMoney className='card_icon' />
                    </div>
                    <h1>RD$ {currentIncome[0]?.salary ?? 0}</h1>
                </div>
                <div className='card'>
                    <div className="card-inner">
                        <h3>Expense Categories</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                    </div>
                    <h1>{currentCategory?.length ?? 0}</h1>
                </div>

                <div className='card'>
                    <div className="card-inner">
                        <h3>Reminder</h3>
                        <MdPayments className='card_icon' />
                    </div>
                    <h1>RD$ {reminder ?? 0}</h1>
                </div>

                <div className='card'>
                    <div className="card-inner">
                        <h3>Monthly expenses</h3>
                        <MdPayment className='card_icon' />
                    </div>
                    <h1>RD$ {totalPayment ?? 0}</h1>
                </div>
            </div>
            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                        style={{ background: '#ffffff' }} 

                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Legend />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </main>
    );
};

export default Charts;

