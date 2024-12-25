import { Wallet, Timer, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";

const WalletStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="p-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Wallet className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-blue-500">2 CFA</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Disponible(s)</p>
        </div>
        <div className="bg-blue-100 p-2 rounded-full">
          <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Card>

      <Card className="p-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Timer className="w-8 h-8 text-amber-500" />
            <span className="text-xl font-bold text-amber-500">5 500 CFA</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">1 Demande(s) en attente</p>
        </div>
        <div className="bg-amber-100 p-2 rounded-full">
          <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Card>

      <Card className="p-4 flex items-center justify-between">
        <div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-8 h-8 text-green-500" />
              <span className="text-xl font-bold text-green-500">72 000 CFA</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">7 Demande(s) validée(s)</p>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <span>0 CFA En transit</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-sm text-blue-500">
              <span>72 000 CFA Transféré(s)</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletStats;