
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ApiKeyInput = () => {
  const { updateApiKey, useDefaultApiKey, toggleUseDefaultApiKey, hasApiKey } = useContract();
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
          {hasApiKey ? 'API Key Settings' : 'Set API Key'}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Choose to use the site's API key or enter your own OpenAI API key for AI-powered contract generation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="use-default-key" className="flex flex-col space-y-1">
              <span>Use site's API key</span>
              <span className="font-normal text-xs text-gray-500">
                Use our provided API key for your contract generation
              </span>
            </Label>
            <Switch
              id="use-default-key"
              checked={useDefaultApiKey}
              onCheckedChange={toggleUseDefaultApiKey}
            />
          </div>
          
          {!useDefaultApiKey && (
            <div className="grid gap-3">
              <Label htmlFor="apiKey" className="text-sm font-medium">
                Your API Key
              </Label>
              <input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your key is stored locally in your browser and never sent to our servers.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          {!useDefaultApiKey && (
            <button 
              onClick={handleSaveApiKey}
              disabled={!apiKey.trim()}
              className="button-transition bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-80 dark:hover:bg-opacity-80 disabled:opacity-50"
            >
              Save API Key
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
