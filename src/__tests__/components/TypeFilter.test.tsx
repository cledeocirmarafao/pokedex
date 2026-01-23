import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TypeFilter } from "../../components/TypeFilter";

describe('TypeFilter Component', () => {
    it('Calls onTypeChange when a type is selected', async () => {
        const user = userEvent.setup()
        const onTypeChange = vi.fn()

        render(<TypeFilter selectedType="all" onTypeChange={onTypeChange}/>)

        const select = screen.getByRole('combobox')
        await user.selectOptions(select, 'bug')

        expect(onTypeChange).toHaveBeenCalledWith('bug')
    })

    it('Shows the selected type', () => {
        const onTypeChange = vi.fn()

        render(<TypeFilter selectedType="ghost" onTypeChange={onTypeChange}/>)

        const select = screen.getByRole('combobox')
        expect(select).toHaveValue('ghost') 
    })

    it('Renders all available types', () => {
        const onTypeChange = vi.fn()

        render(<TypeFilter selectedType="all" onTypeChange={onTypeChange}/>)
        
        const options = screen.getAllByRole('option')

        expect(options).toHaveLength(19)
        expect(screen.getByRole('option', {name: /all types/i})).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'poison'})).toBeInTheDocument()
    })
})