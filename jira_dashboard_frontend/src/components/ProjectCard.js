import React from 'react';
import './ProjectCard.css';

// PUBLIC_INTERFACE
function ProjectCard({ project }) {
  // PUBLIC_INTERFACE
  const getProjectTypeLabel = (typeKey) => {
    const types = {
      'software': 'Software',
      'service_desk': 'Service Desk',
      'business': 'Business',
      'ops': 'Operations'
    };
    return types[typeKey] || typeKey;
  };

  // PUBLIC_INTERFACE
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // PUBLIC_INTERFACE
  const getAvatarUrl = (avatarUrls) => {
    if (!avatarUrls) return null;
    return avatarUrls['48x48'] || avatarUrls['32x32'] || avatarUrls['24x24'] || avatarUrls['16x16'];
  };

  const avatarUrl = getAvatarUrl(project.avatarUrls);

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${project.name} avatar`} />
          ) : (
            <div className="avatar-placeholder">
              {project.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="project-info">
          <h3 className="project-name">{project.name}</h3>
          <p className="project-key">{project.key}</p>
        </div>
        {project.archived && (
          <div className="archived-badge">Archived</div>
        )}
      </div>

      <div className="project-card-body">
        <div className="project-detail">
          <span className="detail-label">Type:</span>
          <span className="detail-value">{getProjectTypeLabel(project.projectTypeKey)}</span>
        </div>

        {project.lead && (
          <div className="project-detail">
            <span className="detail-label">Lead:</span>
            <span className="detail-value">{project.lead.displayName}</span>
          </div>
        )}

        <div className="project-detail">
          <span className="detail-label">Last Updated:</span>
          <span className="detail-value">{formatDate(project.lastUpdated)}</span>
        </div>
      </div>

      <div className="project-card-footer">
        <button className="view-project-button">
          View Project
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
