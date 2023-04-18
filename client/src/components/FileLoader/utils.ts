export enum AttachmentType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOC = 'doc',
}

export const attachmentMap = {
  [AttachmentType.IMAGE]: 'image/png, image/jpeg',
  [AttachmentType.VIDEO]: 'video/mp4',
  [AttachmentType.DOC]: '.doc,.docx,.xml',
};
