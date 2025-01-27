import { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Sidebar from "../components/Sidebar";
import Charts from "./Charts";
import "../App.css";
import Modal from "../components/Modal";
import apiClient from "../utils/request";

function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [incomeAmount, setIncomeAmount] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(0);

    const openModal = (content: string) => {
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent("");
    };


    const addIncomes = async () => {
        try {
            const toke = localStorage.getItem("token");
            const response = await apiClient("/income", {salary: incomeAmount, job_title: jobTitle}, "POST", toke as string);
            closeModal();
        } catch (error) {
            console.log(error, " this is the error...")
        }
    };

    const addCategory = async () => {
        try {
            const token = localStorage.getItem("token");
            const name = category;
            const response = await apiClient("/category", {name, amount}, "POST", token as string);
            closeModal();
        } catch (error) {
            console.log(error, " this is the error...")  
        };
    };

   
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncomeAmount(event.target.value);
    };

    const handleJobTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJobTitle(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const renderModalContent = () => {
        switch (modalContent) {
            case "monthlyIncomes":
                return (
                    <div className="modal-content">
                        <h1 className="modal-title">Add the monthly incomes</h1>
                        <input
                            className="modal-input"
                            placeholder="Enter amount"
                            required
                            value={incomeAmount}
                            onChange={handleInputChange}
                        />
                        <input
                            className="modal-input"
                            placeholder="Job Title"
                            required
                            value={jobTitle}
                            onChange={handleJobTitleChange}
                        />
                        <button className="modal-button" onClick={addIncomes}>Send</button>
                    </div>
                );
            case "category":
                return (
                    <div className="modal-content">
                        <h1 className="modal-title">Add the category</h1>
                        <input
                            className="modal-input"
                            placeholder="Enter category"
                            required
                            value={category}
                            onChange={handleCategoryChange}
                        />
                           <input
                            className="modal-input"
                            placeholder="Enter amount"
                            required
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        <button className="modal-button" onClick={addCategory}>Send</button>
                    </div>
                )
            default:
                return <h1>Default Content</h1>;
        }
    };

    return (
        <div className="grid-container">
            <Headers OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} openModal={openModal} />
            <Charts openModal={openModal} />
            <Modal show={showModal} onClose={closeModal}>
                {renderModalContent()}
            </Modal>
        </div>
    );
}

export default Dashboard;