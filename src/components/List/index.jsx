import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import removeSvg from '../../assets/img/remove.svg'

import Badge from '../Badge'

import './List.scss'

const List = ({ items, isRemovable, setVisiblePopup, onClickItem, onRemove, activeItem}) => {

    const removeList = (item) => {
        if (window.confirm(`Вы действительно хотите удалить список "${item.name}"?`)){
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    }

    return (
        <ul onClick={setVisiblePopup} className="list">
            {items.map((item, index) => (
                <li
                    key={index} 
                    className={classNames(item.className, { 'active': item.active ? item.active : activeItem && activeItem.id === item.id })}
                    onClick={onClickItem ? () => onClickItem(item) : null}
                >
                    <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
                <span>{item.name}{item.tasks && ` (${item.tasks.length})`}</span>
                    { isRemovable && (
                        <img
                            onClick={() => removeList(item)} 
                            className="list__remove-button" 
                            src={removeSvg} 
                            alt="remove icon" 
                        /> 
                    )}
                </li>
            ))}
        </ul>
    );
};

export default List;