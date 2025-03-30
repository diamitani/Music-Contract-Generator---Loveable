
import { useState } from 'react';
import { useContract } from '@/context/ContractContext';
import { Key } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ApiKeyInput = () => {
  const { updateApiKey, hasApiKey } = useContract();
  const [apiKey, setApiKey] = useState('');
  const [open, setOpen] = useState(false);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      updateApiKey(apiKey.trim());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="button-transition flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
          <Key className="w-3.5 h-3.5" />
          {hasApiKey ? 'Update API Key' : 'Set API Key'}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable AI-powered contract generation.
            Your key is stored locally in your browser and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="apiKey" className="text-right text-sm font-medium col-span-1">
              API Key
            </label>
            <input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="col-span-3 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={handleSaveApiKey}
            disabled={!apiKey.trim()}
            className="button-transition bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-80 dark:hover:bg-opacity-80 disabled:opacity-50"
          >
            Save API Key
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
