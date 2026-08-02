export interface Note {
  id: string;
  title: string;
  body: string;
  preview: string;
  isEncrypted: boolean;
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
