describe('Page', () => {
  it('Reheaded state gets updated correctly', () => {
    cy.visitStory('Reheaded', 'simple')

    cy.getInStoryByTestId('headerContainer').should(
      'have.attr',
      'data-state',
      'unfixed',
    )

    cy.scrollTo('bottom')
    cy.getInStoryByTestId('headerContainer').should(
      'have.attr',
      'data-state',
      'unpinned',
    )

    cy.scrollTo(0, '80%', { duration: 1500 })
    cy.getInStoryByTestId('headerContainer').should(
      'have.attr',
      'data-state',
      'pinned',
    )

    cy.scrollTo('top')
    cy.getInStoryByTestId('headerContainer').should(
      'have.attr',
      'data-state',
      'unfixed',
    )
  })

  it('remains fixed when forcePin is applied', () => {
    cy.visitStory('Reheaded', 'forcePin')

    cy.getInStoryByTestId('headerContainer').should(
      'have.attr',
      'data-state',
      'unfixed',
    )
    cy.getInStoryByTestId('forcePinBtn').click()
    cy.scrollTo('bottom')
    cy.getInStoryByTestId('headerContainer').should($el => {
      expect($el).to.have.css('position', 'fixed')
    })
    cy.scrollTo('top')
    cy.getInStoryByTestId('headerContainer').should($el => {
      expect($el).to.have.css('position', 'fixed')
    })
  })

  it('remains fixed when forcePin is applied', () => {
    cy.visitStory('Reheaded', 'disabled')

    cy.getInStoryByTestId('headerContainer').should(
      'have.attr',
      'data-state',
      'unfixed',
    )
    cy.getInStoryByTestId('disabledButton').click()
    cy.scrollTo('bottom')
    cy.getInStoryByTestId('headerContainer').should(
      'have.attr',
      'data-state',
      'unfixed',
    )
    cy.scrollTo(0, '80%', { duration: 1500 })
    cy.getInStoryByTestId('headerContainer').should(
      'have.attr',
      'data-state',
      'unfixed',
    )
  })
})
