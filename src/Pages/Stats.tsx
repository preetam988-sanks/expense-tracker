import React, {useMemo, useState} from 'react'
import {useExpenses} from "../Context/ExpenseContext.tsx";
import {useFetch} from "../Hooks/useFetch.ts";
import {Button} from "../Components/UI/Button.tsx";
import {Select} from "../Components/UI/Select.tsx";

interface ExchangeRateResponse {
    amount: number;
    base: string;
    date: string;
    rates: Record<string, number>;
}

const Stats = () => {
    const {expenses} = useExpenses();
    const [targetCurrency, setTargetCurrency] = useState<string>('USD');

    const totalINR = useMemo(() => {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }, [expenses])

    const url = `https://api.frankfurter.dev/v1/latest?base=INR&symbols=${targetCurrency}`;
    const {data, error, loading, refetch} = useFetch<ExchangeRateResponse>(url);

    const convertTotal = useMemo(() => {
        if (!data || !data.rates[targetCurrency]) return 0;
        return totalINR * data.rates[targetCurrency];
    }, [totalINR, data, targetCurrency]);

    return (
        <section className="max-w-3xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-white mb-6">Live Currency Stats</h2>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">

                <div
                    className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/10 pb-6">
                    <div>
                        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Expenses
                            (Base)</h3>
                        <p className="text-4xl font-bold text-white mt-1">₹{totalINR.toFixed(2)}</p>
                    </div>

                    <div className="w-full md:w-64">
                        <Select
                            label="Convert To"
                            value={targetCurrency}
                            onChange={(e) => setTargetCurrency(e.target.value)}
                            options={[
                                {value: 'USD', label: 'US Dollar (USD)'},
                                {value: 'EUR', label: 'Euro (EUR)'},
                                {value: 'GBP', label: 'British Pound (GBP)'},
                                {value: 'JPY', label: 'Japanese Yen (JPY)'},
                                {value: 'AUD', label: 'Australian Dollar (AUD)'},
                            ]}
                        />
                    </div>
                </div>

                <div className="min-h-[150px] flex items-center justify-center">

                    {loading && (
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-blue-300 font-medium">Fetching live rates...</p>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="text-center bg-red-500/10 border border-red-500/30 p-6 rounded-lg w-full">
                            <p className="text-red-400 mb-4 text-lg">{error}</p>
                            <Button type="button" variant="primary" onClick={refetch}>
                                Try Again
                            </Button>
                        </div>
                    )}

                    {data && !loading && !error && (
                        <div className="text-center w-full bg-blue-900/20 p-6 rounded-lg border border-blue-500/20">
                            <h3 className="text-blue-200 text-sm font-medium uppercase tracking-wider">
                                Converted Total
                            </h3>
                            <p className="text-5xl font-extrabold text-blue-400 mt-2">
                                {convertTotal.toFixed(2)} <span className="text-2xl">{targetCurrency}</span>
                            </p>
                            <p className="text-black text-sm mt-4">
                                Live Rate: 1 INR = {data.rates[targetCurrency]} {targetCurrency}
                            </p>
                            <p className="text-black text-xs mt-1">
                                Last updated: {data.date}
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );

}
export default Stats;