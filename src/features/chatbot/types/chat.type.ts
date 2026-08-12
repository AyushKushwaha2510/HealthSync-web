import { PrescriptionAnalysis } from '@/features/prescriptions/types/prescription.type';

export enum ChatBlockType {
  TEXT = 'text',
  ATTACHMENT = 'attachment',
  ANALYSIS = 'analysis',
}

export interface TextBlock {
  type: ChatBlockType.TEXT;
  content: string;
}

export interface AttachmentBlock {
  type: ChatBlockType.ATTACHMENT;
  file: {
    name: string;
    url: string;
    mimeType: string; // type of file eg. pdf, image, audio, video
  };
}

export interface AnalysisBlock {
  type: ChatBlockType.ANALYSIS;
  analysisType: 'prescription' | 'lab-report';
  result: PrescriptionAnalysis; // TODO: add LabReportAnalysis also
}

export type ChatBlock = TextBlock | AttachmentBlock | AnalysisBlock;

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  block: ChatBlock;
}

export interface SendMessage {
  id: string;
  conversationId: string;
  message: string;
}
