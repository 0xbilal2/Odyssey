export interface Note {
  id: string;
  title: string;
  body: string;
  preview: string;
  isEncrypted: boolean;
  isFavorite?: boolean;
  cipherText?: string;
  iv?: string;
  salt?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  transactionHash?: string;
  shelbyBlobId?: string;
  shelbyUrl?: string;
  walletAddress: string;
}

export type TagType = 'All' | 'Work' | 'Personal' | 'Research' | 'Crypto' | 'Ideas';

export type ActiveNavView = 
  | 'all' 
  | 'recent' 
  | 'favorites' 
  | 'work' 
  | 'personal' 
  | 'research'
  | 'editor'
  | 'features'
  | 'security'
  | 'pricing';

