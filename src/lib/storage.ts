import { Note } from '../types';

const STORAGE_KEY_PREFIX = 'odyssey_notes_';

export function getInitialSampleNotes(walletAddress: string): Note[] {
  const shortWallet = walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : '0x7a...4f2d';
  return [
    {
      id: 'note-sample-1',
      title: 'Aptos Protocol Research & Block-STM',
      body: 'Investigating the parallel execution engine block-STM on Aptos. Performance metrics suggest a significant throughput increase over sequential processing models. Smart contract state conflicts are handled speculatively with optimistic execution.',
      preview: 'Investigating the parallel execution engine block-STM on Aptos. Performance metrics suggest a significant throughput increase over sequential processing models...',
      isEncrypted: true,
      cipherText: 'U2FsdGVkX1+9qK0mZ8n2YvL1pQ4rW5t6y7u8i9o0pA==',
      iv: 'x8q3m4b8v1c5',
      salt: 's0l3k6j9h2g5',
      tags: ['Research', 'Crypto'],
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      transactionHash: '0x8f3a9e...7c2b',
      shelbyBlobId: 'shelby_blob_aptos_research_8921',
      shelbyUrl: 'https://explorer.shelby.xyz/blob/shelby_blob_aptos_research_8921',
      walletAddress,
    },
    {
      id: 'note-sample-2',
      title: 'Project Alpha Encryption Strategy',
      body: 'Zero-knowledge proofs combined with AES-256-GCM client side key derivation. All payloads are signed by wallet address ' + shortWallet + ' before committing to Shelby network storage blobs.',
      preview: 'Zero-knowledge proofs combined with AES-256-GCM client side key derivation. All payloads are signed by wallet...',
      isEncrypted: true,
      cipherText: 'e7x9q2m4b8v1c5z0l3k6j9h2g5f8d1s4a7p0o3i6u9y2t5r8e1w4q7',
      iv: 'a7p0o3i6u9y2',
      salt: 't5r8e1w4q7m9',
      tags: ['Work', 'Ideas'],
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      transactionHash: '0x1c4d7e...9a0f',
      shelbyBlobId: 'shelby_blob_project_alpha_4102',
      shelbyUrl: 'https://explorer.shelby.xyz/blob/shelby_blob_project_alpha_4102',
      walletAddress,
    },
    {
      id: 'note-sample-3',
      title: 'Seed Phrase Backup Strategy',
      body: 'Exploring multi-sig shards distributed across geographic locations. Physical steel plates vs. encrypted digital backups with Shamir Secret Sharing algorithm.',
      preview: 'Exploring multi-sig shards distributed across geographic locations. Physical steel plates vs. encrypted digital backups...',
      isEncrypted: true,
      cipherText: 'm2b4v6c8x0z1a3s5d7f9g1h3j5k7l9',
      iv: 'c8x0z1a3s5d7',
      salt: 'f9g1h3j5k7l9',
      tags: ['Personal', 'Crypto'],
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      transactionHash: '0x3e5f7a...1b2c',
      shelbyBlobId: 'shelby_blob_seed_backup_1092',
      shelbyUrl: 'https://explorer.shelby.xyz/blob/shelby_blob_seed_backup_1092',
      walletAddress,
    },
  ];
}

export function loadNotes(walletAddress: string): Note[] {
  if (!walletAddress) return [];
  const key = STORAGE_KEY_PREFIX + walletAddress.toLowerCase();
  const raw = localStorage.getItem(key);
  if (!raw) {
    const defaults = getInitialSampleNotes(walletAddress);
    saveNotes(walletAddress, defaults);
    return defaults;
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse saved notes:', err);
    return getInitialSampleNotes(walletAddress);
  }
}

export function saveNotes(walletAddress: string, notes: Note[]): void {
  if (!walletAddress) return;
  const key = STORAGE_KEY_PREFIX + walletAddress.toLowerCase();
  localStorage.setItem(key, JSON.stringify(notes));
}

export function addNote(walletAddress: string, note: Note): Note[] {
  const existing = loadNotes(walletAddress);
  const updated = [note, ...existing];
  saveNotes(walletAddress, updated);
  return updated;
}

export function deleteNote(walletAddress: string, noteId: string): Note[] {
  const existing = loadNotes(walletAddress);
  const updated = existing.filter((n) => n.id !== noteId);
  saveNotes(walletAddress, updated);
  return updated;
}
